from flask import Flask, render_template, jsonify
from data.dados_imoveis import get_dados

app = Flask(__name__)


@app.route("/")
def index():
    kpi = get_dados()["kpi"]
    return render_template("index.html", kpi=kpi)


@app.route("/api/dados")
def api_dados():
    return jsonify(get_dados())


if __name__ == "__main__":
    app.run(debug=True, port=5000)
