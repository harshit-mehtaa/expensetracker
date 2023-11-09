FROM python:3.12-alpine

# Diasbles generation of pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# stdout and stderr streams are not buffered and sent straight to your terminal
ENV PYTHONUNBUFFERED 1

# Copy codebase
WORKDIR /home/backend
COPY . .

# Packages for 'psycopg2' pip package
RUN apk add postgresql-dev gcc python3-dev musl-dev \
    && pip install --upgrade pip \
    && pip install -r requirements.txt

EXPOSE 8000

CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]