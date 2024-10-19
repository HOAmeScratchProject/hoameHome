Axolotl Scratch Project Brief

HOA document store & comms platform for owners and board members

1. What is the problem you’re solving?
   Lacking centralized repository for HOA documents & communications - docs & comms are currently scattered across personal emails & personal cloud & hard drives.

2. What is the solution?
   HOA web application for owners and board members

3. What is the MVP scope? (core features you must get working)
   Central location for all HOA docs
   Announcement board for HOA secretary to post announcements
   Authentication: Secure HOA member logins

4. What are the tough technical challenges involved with solving this problem?
   Authorization: Role based Login levels (minimum Admin vs Member) Authorization stretch - Committee(s) level access.

Document and file management
-Board (primary) /Committee (stretch) read/write level documents access
-All Members have read only access to HOA CC&Rs (Covenants, Conditions, & Restrictions)

Voting and Approvals(page or modal?) for securely approving proposed Bylaws changes

Announcements and Communications on message board

Database Design and Management for documents and message board history storage

5. What are the stretch goals?
   Member owners directory

Authorization/access levels: admin (chair and/or secretary), member, committee, &/or board level access to files, etc.

Online payments for annual dues

HOA announcements also sent/forwarded to HOA member personal emails?

Member/Owner voting on proposed Bylaws changes after securely logging in

Committee requests to Board, ARC/Architectural Review Committee, Roads Committee.

Progress meter - status of submitted requests

HOA Budget & Annual financial reports

Chat between members

Report CC&R violations

OAuth

Convert scanned copy (image) of CC&R’s to a searchable digital document.

6. What is the technology stack?
   PostgreSQL, React, Express
