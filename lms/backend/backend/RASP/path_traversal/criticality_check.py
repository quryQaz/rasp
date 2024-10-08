import re

# Шаблоны высокого риска для Path Traversal
high_risk_path_traversal_patterns = [
    r"/etc/passwd",                # Попытка доступа к файлу /etc/passwd
    r"/var/log/",                  # Попытка доступа к системным логам
    r"\.\./\.\./\.\./",            # Множественные уровни директорий
    r"windows/system32",           # Попытка доступа к системной директории на Windows
    r"boot.ini",                   # Критические файлы конфигурации
    r"\.\./.*?\.(php|py|sh|bat)",  # Попытка доступа к файлам с исполняемым кодом
]

def criticality_level_check_path_traversal(requested_path):
    # Проверка на высокий риск Path Traversal
    for pattern in high_risk_path_traversal_patterns:
        if re.search(pattern, requested_path, re.IGNORECASE):
            return "Critical"

    # Проверка на средний риск (если найдены несколько последовательностей ../)
    if requested_path.count('..') > 1:
        return "Medium"

    # Если не совпадает ни с одним из шаблонов - низкий риск
    return "Low"
