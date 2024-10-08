FROM python:3.9
WORKDIR /app

COPY backend/requirements.txt backend/app.py backend/.flaskenv ./
RUN pip install -r ./requirements.txt
RUN pip install flask[async]
ENV FLASK_ENV production

EXPOSE 5000
CMD ["gunicorn", "-b", ":8081", "app:app"]
