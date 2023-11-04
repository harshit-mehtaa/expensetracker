# Initialize project

- Create server manually in PgAdmin page (if not all)
- Create empty 'expensetracker' database manually in PgAdmin page
- Set correct DB credentials in `settings.py`
- Create migration files
```bash
python3 manage.py makemigrations
python3 manage.py makemigrations --merge
```
- Migrate 'users' app
```bash
python3 manage.py migrate users
```
- Migrate 'all' apps
```bash
python3 manage.py migrate
```
- Create django superuser
```bash
python3 manage.py createsuperuser
```
- Login to Django admin page
- Validate that superuser object exists for model 'Auth_Token.Token'
- Create new CustomerUser and corresponding Auth_token.Token