FROM python:3.9.10

RUN pip3 install --upgrade pip
COPY ./ ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
