FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /picha-petrec
COPY requirements.txt /picha-petrec/
RUN pip install -r requirements.txt
COPY . /picha-petrec/