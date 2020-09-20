class Calc {
  getValorTotalDaOrdem(n1, n2) {
    const res = n1 * n2;
    return res;
  }

  getValorTotalComissao(n1) {
    const res = n1 * 0.02;
    return res;
  }
}

export default new Calc();
