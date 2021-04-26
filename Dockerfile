FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /Picha
COPY requirements.txt /Picha/
RUN pip install -r requirements.txt
COPY . /Picha/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh