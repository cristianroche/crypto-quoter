<script setup>
import { reactive, ref } from "vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import useCrypto from "./composables/useCrypto";
import Quoter from "./components/quoter.vue";

const {
  currencies,
  cryptocurrencies,
  quotation,
  loading,
  getQuote,
  isEmptyQuotation,
} = useCrypto();

const error = ref("");

const quote = reactive({
  currency: "",
  cryptocurrency: "",
});

const quoteCryptoCurrency = () => {
  if (Object.values(quote).includes("")) {
    error.value = "All fields are required";

    setTimeout(() => {
      error.value = "";
    }, 3000);

    return;
  }

  error.value = "";

  getQuote(quote);
};
</script>

<template>
  <div class="container">
    <h1 class="title"><span>Cryptocurrency </span>Quoter</h1>

    <div class="content">
      <Alert v-if="error">
        {{ error }}
      </Alert>
      <form class="form" @submit.prevent="quoteCryptoCurrency">
        <div class="field">
          <label for="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            class="select"
            v-model="quote.currency"
          >
            <option value="">-- Select a currency --</option>
            <option v-for="currency in currencies" :value="currency.code">
              {{ currency.text }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="cryptocurrency">Crypto Currency:</label>
          <select
            id="cryptocurrency"
            name="cryptocurrency"
            class="select"
            v-model="quote.cryptocurrency"
          >
            <option value="">-- Select a currency --</option>
            <option
              v-for="cryptocurrency in cryptocurrencies"
              :value="cryptocurrency.CoinInfo.Name"
            >
              {{ cryptocurrency.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <input type="submit" value="Quote" />
      </form>

      <Spinner v-if="loading" />

      <Quoter v-if="isEmptyQuotation" :quotation="quotation" />
    </div>
  </div>
</template>
