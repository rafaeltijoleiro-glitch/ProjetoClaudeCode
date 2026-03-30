ANOS = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]

EVOLUCAO_GERAL = {
    "labels": ANOS,
    "valores": [3000, 3280, 3500, 3950, 4400, 4980, 5600, 5820]
}

TIPOS_IMOVEL = {
    "labels": ANOS,
    "apartamento": [3100, 3400, 3650, 4100, 4600, 5200, 5600, 5820],
    "casa":        [2300, 2500, 2700, 3000, 3300, 3750, 4100, 4310],
    "comercial":   [3800, 4050, 4200, 4600, 5100, 5700, 6100, 6450]
}

BAIRROS = {
    "labels": ["Pio Corrêa", "Centro", "Comerciário", "Michel", "Boa Vista", "Santa Luzia", "Próspera", "Pinheirinho", "Rio Maina", "Universitário"],
    "valorizacao": [148, 94, 88, 105, 130, 112, 78, 72, 65, 58]
}

# Preço m² de apartamentos por bairro/região em 2025 (ordenado do mais ao menos valorizado)
# Valores baseados em dados de plataformas imobiliárias (ZAP, ImovelGuide) e pesquisa de mercado
APTOS_POR_REGIAO = {
    "regioes": [
        {"bairro": "Pio Corrêa",     "preco_m2": 9200, "variacao_anual": 15.1, "oferta": 22},  # mais nobre de Criciúma
        {"bairro": "Centro",         "preco_m2": 7332, "variacao_anual": 11.8, "oferta": 95},  # R$ 7.332 (ZAP Imóveis)
        {"bairro": "Comerciário",    "preco_m2": 6180, "variacao_anual": 9.7,  "oferta": 61},  # R$ 5.407–6.178 (ImovelGuide)
        {"bairro": "Michel",         "preco_m2": 5742, "variacao_anual": 10.9, "oferta": 47},  # R$ 5.742 (ImovelGuide)
        {"bairro": "Boa Vista",      "preco_m2": 5500, "variacao_anual": 12.3, "oferta": 38},
        {"bairro": "Santa Luzia",    "preco_m2": 5200, "variacao_anual": 13.5, "oferta": 52},
        {"bairro": "Próspera",       "preco_m2": 5050, "variacao_anual": 8.3,  "oferta": 43},
        {"bairro": "Pinheirinho",    "preco_m2": 4850, "variacao_anual": 7.6,  "oferta": 29},  # ~R$ 5.060 (ImovelGuide)
        {"bairro": "Rio Maina",      "preco_m2": 4300, "variacao_anual": 8.1,  "oferta": 24},
        {"bairro": "Universitário",  "preco_m2": 3900, "variacao_anual": 9.4,  "oferta": 31},
    ]
}

KPI = {
    "preco_apto":        "R$ 5.820",
    "preco_casa":        "R$ 4.310",
    "preco_comercial":   "R$ 6.450",
    "valorizacao_7anos": "+94%"
}


def get_dados():
    return {
        "evolucao":        EVOLUCAO_GERAL,
        "tipos":           TIPOS_IMOVEL,
        "bairros":         BAIRROS,
        "aptos_por_regiao": APTOS_POR_REGIAO,
        "kpi":             KPI
    }
