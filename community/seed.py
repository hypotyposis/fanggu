#!/usr/bin/env python3
"""Add explicitly labelled sample accounts to a separate, disposable prototype database."""
import argparse
from pathlib import Path
from server import Community, DIMENSIONS, now

SAMPLES = [
    ('yanbei', '雁北行', '沿着木构，慢慢读山西。', 0),
    ('liangjian', '梁间一束光', '喜欢看斗栱，也喜欢殿前的树影。', 1),
    ('shijie', '石阶', '把在路上的观察，记成短短几行。', 2),
    ('tingyu', '听雨檐下', '从屋顶到墙角，总有值得停留的细节。', 3),
    ('songfeng', '松风', '看建筑，也看它与山水的关系。', 6),
    ('yueluo', '月落古城', '城市边缘与古寺深处。', 7),
]
TEXTS = {
    'foguang': ['站在殿前回望来路，才体会到台地与山势是怎样托起这座大殿的。', '最想再看一次的是檐下的层层出跳。近看构件，远看整体，两种尺度都耐人寻味。', '没有急着拍照，沿着殿前慢慢走了一遍。建筑与塑像放在一起看，比单独看更有感受。', '殿前的开阔与室内的深远形成很鲜明的对照。值得留出安静观看的时间。', '尺度并不只来自体量，也来自柱、梁和人的关系。', '光落到木构上的时候，很多原本不易察觉的层次就显出来了。'],
    'yingxian': ['绕塔一周，每换一个角度，檐层的节奏都不同。建议先远看，再靠近细读。', '最打动我的是层层檐影之下依然清楚的结构秩序。'],
    'nanchan': ['大殿不大，比例却让人愿意停留很久。看完之后，更能理解“简洁”并不等于简单。', '山村里的环境让观看的节奏自然慢下来。'],
    'dule': ['从山门向里走，空间逐步展开。把门、阁和院落连起来看，比只盯着单体更有意思。'],
    'jinci': ['树、水与建筑相互映衬，环境格局值得单独花时间体会。'],
    'bj_zhihua': ['在城市里进入这样一组院落，声音与光线都忽然变了。彩画和细部值得近看。'],
}


def seed(database):
    app = Community(database)
    with app.lock, app.db:
        for i, (handle, name, bio, avatar) in enumerate(SAMPLES):
            existing = app.one('SELECT * FROM users WHERE handle=?', (handle,))
            if existing and not existing['demo']:
                raise RuntimeError(f'Refusing to overwrite real account: {handle}')
            if not existing:
                result = app.dispatch('POST', '/v1/auth/register', {}, {'handle': handle, 'password': 'fanggu-demo-2026', 'nickname': name, 'acceptPublicReviews': True}, '', 'seed-' + handle)
                app.db.execute('UPDATE users SET demo=1,bio=?,avatar=? WHERE id=?', (bio, avatar, result['user']['id']))
            current = app.one('SELECT * FROM users WHERE handle=?', (handle,))
            token = app.session(current)['token']
            for j, (site_id, texts) in enumerate(TEXTS.items()):
                if j > 0 and i >= len(texts):
                    continue
                if app.one('SELECT 1 FROM reviews WHERE user_id=? AND site_id=?', (current['id'], site_id)):
                    continue
                values = [5, 4, 5, 4, 3, 4] if i % 2 == 0 else [4, 4, 4, 5, 4, 5]
                app.dispatch('PUT', '/v1/me/reviews/' + site_id, {}, {'dimensions': dict(zip(DIMENSIONS, values)), 'text': texts[i % len(texts)], 'baseRevision': 0, 'mutationID': f'seed-{handle}-{site_id}'.replace('_', '-')}, token, 'seed')
    app.close()
    print('Labelled sample content ready. Sample account: yanbei / fanggu-demo-2026')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--database', default=str(Path(__file__).parent / 'data/prototype.sqlite'))
    args = parser.parse_args()
    seed(args.database)
