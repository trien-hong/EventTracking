FROM python:3.11.3
ENV PYTHONUNBUFFERED=1
WORKDIR /django_backend
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .