#!/usr/bin/env python3
"""Local operator tool. Requires filesystem access to the community database."""
import argparse
import json
from server import Community

parser = argparse.ArgumentParser()
parser.add_argument('--database', required=True)
parser.add_argument('--resolve', help='Report ID')
parser.add_argument('--action', choices=['dismiss', 'hide', 'restore'])
args = parser.parse_args()
app = Community(args.database)
try:
    if args.resolve:
        if not args.action:
            parser.error('--resolve requires --action')
        with app.db:
            report = app.one('SELECT * FROM reports WHERE id=?', (args.resolve,))
            if not report:
                raise SystemExit('Report not found')
            if args.action in ('hide', 'restore'):
                app.db.execute('UPDATE reviews SET hidden=? WHERE sequence=?', (args.action == 'hide', report['review_id']))
            app.db.execute('UPDATE reports SET status=? WHERE id=?', (args.action, args.resolve))
    rows = app.db.execute('SELECT p.*,r.text,r.site_id,u.handle FROM reports p LEFT JOIN reviews r ON p.review_id=r.sequence LEFT JOIN users u ON u.id=r.user_id ORDER BY p.created_at DESC').fetchall()
    print(json.dumps([dict(r) for r in rows], ensure_ascii=False, indent=2))
finally:
    app.close()
