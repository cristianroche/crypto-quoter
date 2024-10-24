import { computed, onMounted, reactive, ref } from "vue";

export default function useCrypto() {
  const currencies = ref([
    { code: "USD", text: "US Dolar" },
    { code: "MXN", text: "Mexican Peso" },
    { code: "EUR", text: "Euro" },
    { code: "GBP", text: "Pound sterling" },
    { code: "ARS", text: "Argentinean Peso" },
  ]);
  const quotation = ref({});
  const loading = ref(false);
  const cryptocurrencies = ref([]);

  onMounted(() => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
    fetch(url)
      .then((response) => response.json())
      .then(({ Data }) => {
        cryptocurrencies.value = Data;
      });
  });

  const getQuote = async (quote) => {
    loading.value = true;
    quotation.value = {};
    try {
      const { cryptocurrency, currency } = quote;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
      const response = await fetch(url);
      const data = await response.json();
      quotation.value = data.DISPLAY[cryptocurrency][currency];
    } catch (error) {
      error.value = "There was an error, try again later";
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const isEmptyQuotation = computed(
    () => Object.values(quotation.value).length > 0
  );

  return {
    currencies,
    cryptocurrencies,
    quotation,
    loading,
    getQuote,
    isEmptyQuotation,
  };
}
