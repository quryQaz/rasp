import re

# Шаблоны высокого риска для SSTI
high_risk_ssti_patterns = [
    r"{{.*?}}",               # Jinja2-style template injection
    r"{%.*?%}",                # Jinja2 block expressions
    r"\${.*?}",                # Java- and JSP-style expression injection
    r"self|request|session",   # Прямые ссылки на объекты приложения
    r"__class__|__globals__",  # Вызов специальных методов и атрибутов
    r"os\.|sys\.",             # Доступ к модулю os и sys для выполнения системных команд
    r"eval\(|exec\(",          # Попытка выполнить произвольный код
]

def criticality_level_check_ssti(query, blacklist):
    # Проверка на высокий риск SSTI
    for pattern in high_risk_ssti_patterns:
        if re.search(pattern, query, re.IGNORECASE):
            return "Critical"

    # Проверка на средний риск SSTI
    pattern = '|'.join(re.escape(word) for word in blacklist)
    if len(re.findall(pattern, query, re.IGNORECASE)) > 1:
        return "Medium"

    # Если не совпадает ни с одним из шаблонов - низкий риск
    return "Low"
