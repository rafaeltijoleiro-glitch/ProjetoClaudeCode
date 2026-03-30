const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#94a3b8", font: { size: 12 } }
    },
    tooltip: { mode: "index", intersect: false }
  },
  scales: {
    x: { ticks: { color: "#64748b" }, grid: { color: "#1e2a3a" } },
    y: { ticks: { color: "#64748b" }, grid: { color: "#1e2a3a" } }
  }
};

function brlTicks(axis) {
  return {
    ...axis,
    ticks: {
      color: "#64748b",
      callback: v => "R$ " + v.toLocaleString("pt-BR")
    }
  };
}

async function renderCharts() {
  const res = await fetch("/api/dados");
  const dados = await res.json();

  // Gráfico 1 — Evolução geral do preço m²
  new Chart(document.getElementById("chartEvolucao"), {
    type: "line",
    data: {
      labels: dados.evolucao.labels,
      datasets: [{
        label: "Preço médio m² (R$)",
        data: dados.evolucao.valores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.12)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 5
      }]
    },
    options: {
      ...chartDefaults,
      scales: {
        x: chartDefaults.scales.x,
        y: brlTicks(chartDefaults.scales.y)
      }
    }
  });

  // Gráfico 2 — Comparativo por tipo de imóvel
  new Chart(document.getElementById("chartTipos"), {
    type: "line",
    data: {
      labels: dados.tipos.labels,
      datasets: [
        {
          label: "Apartamento",
          data: dados.tipos.apartamento,
          borderColor: "#3b82f6",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: "Casa",
          data: dados.tipos.casa,
          borderColor: "#10b981",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: "Comercial",
          data: dados.tipos.comercial,
          borderColor: "#f59e0b",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        x: chartDefaults.scales.x,
        y: brlTicks(chartDefaults.scales.y)
      }
    }
  });

  // ── Seção: Apartamentos por Região ──────────────────────────────────────

  const regioes   = dados.aptos_por_regiao.regioes;
  const labelsReg = regioes.map(r => r.bairro);
  const precosReg = regioes.map(r => r.preco_m2);
  const varReg    = regioes.map(r => r.variacao_anual);
  const maxPreco  = Math.max(...precosReg);

  // Gráfico 4 — Ranking preço m² por bairro (barra horizontal)
  new Chart(document.getElementById("chartAptosBairro"), {
    type: "bar",
    data: {
      labels: labelsReg,
      datasets: [{
        label: "Preço m² (R$)",
        data: precosReg,
        backgroundColor: precosReg.map(v => {
          const pct = v / maxPreco;
          if (pct >= 0.9) return "#3b82f6";
          if (pct >= 0.75) return "#8b5cf6";
          if (pct >= 0.6)  return "#10b981";
          if (pct >= 0.45) return "#f59e0b";
          return "#64748b";
        }),
        borderRadius: 6
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: "y",
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => " R$ " + ctx.parsed.x.toLocaleString("pt-BR") + "/m²"
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#64748b", callback: v => "R$ " + v.toLocaleString("pt-BR") },
          grid: { color: "#1e2a3a" }
        },
        y: { ticks: { color: "#e2e8f0", font: { weight: "500" } }, grid: { color: "#1e2a3a" } }
      }
    }
  });

  // Gráfico 5 — Variação anual por bairro
  new Chart(document.getElementById("chartVariacaoAnual"), {
    type: "bar",
    data: {
      labels: labelsReg,
      datasets: [{
        label: "Variação anual (%)",
        data: varReg,
        backgroundColor: "rgba(52,211,153,0.75)",
        borderColor: "#34d399",
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => " +" + ctx.parsed.y.toFixed(1) + "% no ano" }
        }
      },
      scales: {
        x: { ticks: { color: "#64748b", maxRotation: 35 }, grid: { color: "#1e2a3a" } },
        y: {
          ticks: { color: "#64748b", callback: v => v + "%" },
          grid: { color: "#1e2a3a" }
        }
      }
    }
  });

  // Tabela de ranking
  const tbody = document.getElementById("tabelaBody");
  regioes.forEach((r, i) => {
    const pct = Math.round((r.preco_m2 / maxPreco) * 100);
    tbody.innerHTML += `
      <tr>
        <td class="rank">${i + 1}º</td>
        <td>${r.bairro}</td>
        <td class="preco">
          <div class="bar-inline">
            <span>R$ ${r.preco_m2.toLocaleString("pt-BR")}</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div>
          </div>
        </td>
        <td class="var-up">▲ +${r.variacao_anual.toFixed(1)}%</td>
        <td class="oferta">${r.oferta} unid.</td>
      </tr>`;
  });

  // Gráfico 3 — Valorização por bairro (barra horizontal)
  new Chart(document.getElementById("chartBairros"), {
    type: "bar",
    data: {
      labels: dados.bairros.labels,
      datasets: [{
        label: "Valorização % (2018–2025)",
        data: dados.bairros.valorizacao,
        backgroundColor: [
          "#3b82f6", "#8b5cf6", "#10b981",
          "#f59e0b", "#ef4444", "#06b6d4", "#84cc16"
        ],
        borderRadius: 6
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: "y",
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: {
            color: "#64748b",
            callback: v => v + "%"
          },
          grid: { color: "#1e2a3a" }
        },
        y: { ticks: { color: "#64748b" }, grid: { color: "#1e2a3a" } }
      }
    }
  });
}

renderCharts();
