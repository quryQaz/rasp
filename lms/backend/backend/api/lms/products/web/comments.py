from flask import Flask, render_template_string, request, jsonify
from RASP.ssti.main import prevent_ssti

comments = []

@prevent_ssti()
async def post_comment(request):
    comment = request.json.get('text')

    # Небезопасное добавление комментария с возможностью SSTI
    template = f"Комментарий: {comment}"
    comments.append(template)

    return jsonify({"message": "Комментарий добавлен успешно"}), 200


async def get_comments():
    # Небезопасный рендеринг комментариев через Jinja2 (SSTI)
    rendered_comments = [render_template_string(comment) for comment in comments]
    return jsonify(rendered_comments)
