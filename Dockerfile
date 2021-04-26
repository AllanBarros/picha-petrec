FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /Picha
COPY requirements.txt /Picha/
RUN pip install -r requirements.txt
COPY . /Picha/
COPY ./entrypoint.sh /usr/local/bin/
COPY ./docker/entrypoint.sh /${projectName}/
# backwards compat
RUN ln -s usr/local/bin/entrypoint.sh /
ENTRYPOINT ["entrypoint.sh"]
CMD ["entrypoint.sh"]