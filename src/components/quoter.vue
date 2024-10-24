<script setup>
defineProps({
  quotation: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="result-container">
    <h2>Quotation</h2>
    <div class="result">
      <img
        :src="'https://cryptocompare.com/' + quotation.IMAGEURL"
        alt="crypto image"
      />
      <div>
        <p>
          The price is: <span>{{ quotation.PRICE }}</span>
        </p>
        <p>
          The highest price of the day: <span>{{ quotation.HIGHDAY }}</span>
        </p>
        <p>
          The lowest price of the day: <span>{{ quotation.LOWDAY }}</span>
        </p>
        <p>
          Variation last 24 hours:
          <span>{{ quotation.CHANGEPCT24HOUR }}%</span>
        </p>
        <p>
          Last update: <span>{{ quotation.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
