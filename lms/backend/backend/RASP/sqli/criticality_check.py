import re

high_risk_patterns = [
    r"UNION\s+SELECT",
    r"SELECT\s+.+\s+FROM",
    r"OR\s+'1'='1'",
    # r"OR\s+EXISTS\s*(",
    r"HAVING\s+1=1",
    r"ORDER\s+BY\s+\d+",
    r"AND\s+(\d+)\s*=\s*\1",
    r"'[^']*'='[^']*",
    r"'.+--",
]

def criticality_level_check(query, blacklist):
    # Проверка на высокий риск
    for pattern in high_risk_patterns:
        if re.search(pattern, query, re.IGNORECASE):
            return "Critical"

    # Проверка на средний риск
    pattern = '|'.join(re.escape(word) for word in blacklist)
    if len(re.findall(pattern, query, re.IGNORECASE)) > 1:
        return "Medium"

    # Если не совпадает ни с одним из шаблонов низкий
    return "Low"
