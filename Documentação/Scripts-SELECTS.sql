-- Ranking de vacinação por cidade: (ERRADO)
SELECT 
    c.nome AS cidade,
    o.anoReferencia,
    o.coberturaVacinal,
    'Cidade do usuário' AS origem
FROM usuarios u
JOIN cidades c ON u.fkCidadeResidente = c.codigoIbge
JOIN ocorrencias o ON o.fkCidade = c.codigoIbge
WHERE u.idUsuario = 1
  AND o.anoReferencia = (
      SELECT MAX(anoReferencia)
      FROM ocorrencias
      WHERE fkCidade = u.fkCidadeResidente
  )

UNION ALL

SELECT 
    c.nome AS cidade,
    o.anoReferencia,
    o.coberturaVacinal,
    'Outra cidade' AS origem
FROM usuarios u
JOIN cidades c ON c.codigoIbge != u.fkCidadeResidente
JOIN ocorrencias o ON o.fkCidade = c.codigoIbge
WHERE u.idUsuario = 1
  AND o.anoReferencia = (
      SELECT MAX(anoReferencia)
      FROM ocorrencias
  )
ORDER BY coberturaVacinal DESC
LIMIT 5;


-- Situação vacinal ao longo dos anos: (ERRADO)
SELECT 
    d.nomeDoenca,
    c.nome AS cidade,
    o.anoReferencia,
    o.coberturaVacinal
FROM ocorrencias o
JOIN doencas d ON o.fkDoenca = d.idDoenca
JOIN cidades c ON o.fkCidade = c.codigoIbge
ORDER BY d.nomeDoenca, c.nome, o.anoReferencia
LIMIT 10;

-- Situação vacinal ao longo dos anos da cidade: (ERRADO)
SELECT 
    d.nomeDoenca,
    c.nome AS cidade,
    o.anoReferencia,
    o.coberturaVacinal
FROM usuarios u
JOIN cidades c ON u.fkCidadeResidente = c.codigoIbge
JOIN ocorrencias o ON o.fkCidade = c.codigoIbge
JOIN doencas d ON o.fkDoenca = d.idDoenca
WHERE u.idUsuario = 1
ORDER BY d.nomeDoenca, c.nome, o.anoReferencia;

-- Situação da cobertura vacinal do estado: (VERIFICADO)
-- Total de cidades com cobertura média abaixo de 85%
SELECT COUNT(*) AS total_cidades_baixo_85
FROM (
    SELECT
        o.fkCidade,
        ROUND(AVG(o.coberturaVacinal), 2) AS media_cobertura
    FROM ocorrencias o
    JOIN (
        SELECT
            fkCidade,
            MAX(anoReferencia) AS maxAno
        FROM ocorrencias
        GROUP BY fkCidade
    ) maxAnos ON o.fkCidade = maxAnos.fkCidade AND o.anoReferencia = maxAnos.maxAno
    GROUP BY o.fkCidade
    HAVING media_cobertura < 85
) sub;


-- Total de cidades com cobertura média acima de 95%:
SELECT COUNT(*) AS total_cidades_acima_95
FROM (
    SELECT
        o.fkCidade,
        ROUND(AVG(o.coberturaVacinal), 2) AS media_cobertura
    FROM ocorrencias o
    JOIN (
        SELECT
            fkCidade,
            MAX(anoReferencia) AS maxAno
        FROM ocorrencias
        GROUP BY fkCidade
    ) maxAnos ON o.fkCidade = maxAnos.fkCidade AND o.anoReferencia = maxAnos.maxAno
    GROUP BY o.fkCidade
    HAVING media_cobertura > 95
) sub;

-- Total de cidades com cobertura média acima de 95%:
SELECT COUNT(*) AS total_cidades_acima_95
FROM (
    SELECT
        o.fkCidade,
        ROUND(AVG(o.coberturaVacinal), 2) AS media_cobertura
    FROM ocorrencias o
    JOIN (
        SELECT
            fkCidade,
            MAX(anoReferencia) AS maxAno
        FROM ocorrencias
        GROUP BY fkCidade
    ) maxAnos ON o.fkCidade = maxAnos.fkCidade AND o.anoReferencia = maxAnos.maxAno
    GROUP BY o.fkCidade
    HAVING media_cobertura > 95
) sub;


-- Total de vacinados e não vacinados: (VERIFICADO)

SELECT
    SUM(ROUND((o.coberturaVacinal / 100) * cs.quantidadeCasos)) AS total_vacinados,
    SUM(ROUND(cs.quantidadeCasos - ((o.coberturaVacinal / 100) * cs.quantidadeCasos))) AS total_nao_vacinados
FROM
    ocorrencias o
JOIN
    casos cs
    ON o.fkDoenca = cs.fkCasos_Doenca
    AND o.fkCidade = cs.fkCasos_Cidade
    AND o.anoReferencia = cs.anoReferencia
WHERE
    o.coberturaVacinal IS NOT NULL
    AND cs.quantidadeCasos IS NOT NULL;

-- Total de vacinados e não vacinados por doença: (VERIFICADO)

SELECT
    SUM(ROUND((o.coberturaVacinal / 100) * cs.quantidadeCasos)) AS total_vacinados,
    SUM(ROUND(cs.quantidadeCasos - ((o.coberturaVacinal / 100) * cs.quantidadeCasos))) AS total_nao_vacinados
FROM
    ocorrencias o
JOIN
    casos cs
    ON o.fkDoenca = cs.fkCasos_Doenca
    AND o.fkCidade = cs.fkCasos_Cidade
    AND o.anoReferencia = cs.anoReferencia
JOIN
    doencas d ON o.fkDoenca = d.idDoenca
WHERE
    o.coberturaVacinal IS NOT NULL
    AND cs.quantidadeCasos IS NOT NULL
    AND d.nomeDoenca = {nomeDoenca};


-- Total de vacinados e não vacinados por doença e cidade: (VERIFICADO)

SELECT
    SUM(ROUND((o.coberturaVacinal / 100) * cs.quantidadeCasos)) AS total_vacinados,
    SUM(ROUND(cs.quantidadeCasos - ((o.coberturaVacinal / 100) * cs.quantidadeCasos))) AS total_nao_vacinados
FROM
    ocorrencias o
JOIN
    casos cs
    ON o.fkDoenca = cs.fkCasos_Doenca
    AND o.fkCidade = cs.fkCasos_Cidade
    AND o.anoReferencia = cs.anoReferencia
JOIN
    doencas d ON o.fkDoenca = d.idDoenca
JOIN
    cidades c ON o.fkCidade = c.codigoIbge
WHERE
    o.coberturaVacinal IS NOT NULL
    AND cs.quantidadeCasos IS NOT NULL
    AND d.nomeDoenca = {nomeDoenca}
    AND c.nome = {nomeCidade};   

-- Total de casos da doença por ano: (VERIFICADO) 
SELECT 
    d.nomeDoenca,
    c.anoReferencia,
    SUM(c.quantidadeCasos) AS total_casos
FROM 
    casos c
JOIN 
    doencas d ON c.fkCasos_Doenca = d.idDoenca
WHERE 
    d.nomeDoenca = {nomeDoenca} 
    AND c.anoReferencia BETWEEN 2017 AND 2024
GROUP BY 
    d.nomeDoenca, c.anoReferencia
ORDER BY 
    c.anoReferencia;


-- Meta vacinal da doença por ano: (Verificado)
SELECT 
    d.nomeDoenca,
    o.anoReferencia,
    ROUND(AVG(
        CASE 
            WHEN o.coberturaVacinal > 100 THEN 100
            ELSE o.coberturaVacinal
        END
    ), 2) AS media_cobertura_vacinal
FROM 
    ocorrencias o
JOIN 
    doencas d ON o.fkDoenca = d.idDoenca
WHERE 
    d.nomeDoenca = 'Poliomielite'
    AND o.anoReferencia = 2024
    AND o.coberturaVacinal IS NOT NULL
GROUP BY 
    d.nomeDoenca, o.anoReferencia;



-- Ranking de alerta vacinação: (VERFICADO)
SELECT
    c.nome AS cidade,
    COUNT(*) AS num_ocorrencias
FROM ocorrencias o
JOIN cidades c ON o.fkCidade = c.codigoIbge
GROUP BY c.nome
ORDER BY num_ocorrencias ASC LIMIT 10;

-- Variação da cobertura de vacinaçao dos últimos 12 meses de todas cidades: (VERIFICADO)
SELECT
    ROUND(
        AVG(
            (
                (LEAST(o1.coberturaVacinal, 100) - LEAST(o2.coberturaVacinal, 100)) 
                / LEAST(o2.coberturaVacinal, 100)
            ) * 100
        ),
        2
    ) AS variacaoPercentualMedia
FROM ocorrencias o1
JOIN ocorrencias o2
    ON o1.fkDoenca = o2.fkDoenca
    AND o1.fkCidade = o2.fkCidade
    AND o1.anoReferencia = o2.anoReferencia + 1
JOIN doencas d ON o1.fkDoenca = d.idDoenca
WHERE
    d.nomeDoenca = 'Poliomielite'
    AND o1.anoReferencia = 2024
    AND o2.anoReferencia = 2023
    AND o1.coberturaVacinal IS NOT NULL
    AND o2.coberturaVacinal IS NOT NULL;

-- Variação de casos de todas cidades: (VERIFICADO)
SELECT
    ROUND(
        AVG(
            (
                (c1.quantidadeCasos - c2.quantidadeCasos) 
                / NULLIF(c2.quantidadeCasos, 0)
            ) * 100
        ),
        2
    ) AS variacaoPercentualCasos
FROM casos c1
JOIN casos c2
    ON c1.fkCasos_Doenca = c2.fkCasos_Doenca
    AND c1.fkCasos_Cidade = c2.fkCasos_Cidade
    AND c1.anoReferencia = c2.anoReferencia + 1
JOIN doencas d ON c1.fkCasos_Doenca = d.idDoenca
WHERE
    d.nomeDoenca = 'Poliomielite'
    AND c1.anoReferencia = 2024
    AND c2.anoReferencia = 2023
    AND c1.quantidadeCasos IS NOT NULL
    AND c2.quantidadeCasos IS NOT NULL;

-- Variação quantidade de casos últimos 12 meses por cidade: (VERIFICADO)

SELECT
    c.nome AS cidade,
    SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END) AS total_2023,
    SUM(CASE WHEN ca.anoReferencia = 2024 THEN ca.quantidadeCasos ELSE 0 END) AS total_2024,
    ROUND(
        CASE 
            WHEN SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END) = 0 THEN NULL
            ELSE (
                (
                    SUM(CASE WHEN ca.anoReferencia = 2024 THEN ca.quantidadeCasos ELSE 0 END) -
                    SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END)
                ) * 100.0
            ) / SUM(CASE WHEN ca.anoReferencia = 2023 THEN ca.quantidadeCasos ELSE 0 END)
        END, 2
    ) AS variacaoPercentual
FROM casos ca
JOIN doencas d ON ca.fkCasos_Doenca = d.idDoenca
JOIN cidades c ON ca.fkCasos_Cidade = c.codigoIbge
WHERE d.nomeDoenca = 'Coqueluche'
  AND c.nome = 'Sao Paulo'
  AND ca.anoReferencia IN (2023, 2024)
GROUP BY c.nome;

-- Variação cobertura vacinal dos últimos 12 meses por cidade: (VERIFICADO)
SELECT
    c.nome AS cidade,
    d.nomeDoenca,
    ROUND(AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END), 2) AS cobertura_2024,
    ROUND(AVG(CASE WHEN o.anoReferencia = 2025 THEN LEAST(o.coberturaVacinal, 100) ELSE 0 END), 2) AS cobertura_2025,
    ROUND(
        CASE
            WHEN AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END) = 0 THEN NULL
            ELSE (
                (
                    AVG(CASE WHEN o.anoReferencia = 2025 THEN LEAST(o.coberturaVacinal, 100) ELSE 0 END) -
                    AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END)
                ) * 100.0
            ) / AVG(CASE WHEN o.anoReferencia = 2024 THEN LEAST(o.coberturaVacinal, 100) ELSE NULL END)
        END, 2
    ) AS variacaoPercentual
FROM ocorrencias o
JOIN doencas d ON o.fkDoenca = d.idDoenca
JOIN cidades c ON o.fkCidade = c.codigoIbge
WHERE d.nomeDoenca = 'Coqueluche'
  AND c.nome = 'Sao Paulo'
  AND o.anoReferencia IN (2024, 2025)
GROUP BY c.nome, d.nomeDoenca;