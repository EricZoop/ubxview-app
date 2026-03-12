function pdf = chitwopdf(x,k)


pdf = x.^(k/2-1).*exp(-x/2);
pdf = pdf/gamma(k/2);
pdf = pdf/2^(k/2);
