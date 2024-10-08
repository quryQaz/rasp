import re

# Шаблоны высокого риска
high_risk_xss_patterns = [
    r"<script.*?>.*?</script>",  # Полный тег <script>
    r"javascript:",              # Прямой JavaScript в атрибутах, например, href="javascript:..."
    r"on\w+\s*=",                # Любые события JavaScript, например, onerror=, onload=
    r"eval\(",                   # Использование eval()
    r"expression\(",              # CSS-выражение, например, expression()
    r"document\.cookie",          # Доступ к cookies через JavaScript
    r"document\.location",        # Попытка манипуляции с location
]

def criticality_level_check_xss(query, blacklist):
    # Проверка на высокий риск XSS
    for pattern in high_risk_xss_patterns:
        if re.search(pattern, query, re.IGNORECASE):
            return "Critical"

    # Проверка на средний риск XSS
    pattern = '|'.join(re.escape(word) for word in blacklist)
    if len(re.findall(pattern, query, re.IGNORECASE)) > 1:
        return "Medium"

    # Если не совпадает ни с одним из шаблонов - низкий риск
    return "Low"
