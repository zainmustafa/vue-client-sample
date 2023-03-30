<template>
    <div class="container">
        <Bar v-if="loaded" :options="chartOptions" :data="chartData" />
    </div>
</template>
  
<script>
// Uncomment this
// import axios from 'axios';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            loaded: false,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true
            }
        };
    },
    async mounted() {
        try {
            this.loaded = false;

            // API Response is an invalid JSON, it has a missing comma after third oject which is resulting in exception when parsed
            // **** Once Response from Backend is sorted, uncomment below two lines **** //
            // const response = await axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country');
            // this.data = response.data;

            // and remove this block
            this.data = `{
                "totalItems": 9000,
                "items": [
                    {
                        "period": "month",
                        "date": "2022-12",
                        "country": "US",
                        "count": 1500
                    },
                    {
                        "period": "month",
                        "date": "2022-12",
                        "country": "UA",
                        "count": 2000
                    },
                    {
                        "period": "month",
                        "date": "2023-01",
                        "country": "US",
                        "count": 3750
                    },
                    {
                        "period": "month",
                        "date": "2023-01",
                        "country": "UA",
                        "count": 1750
                    }
                ]
            }`;
            // and remove this block

            const parsed = await JSON.parse(this.data);

            // Extract labels and values from data
            const labels = parsed.items.map(d => d.date);
            const values = parsed.items.map(d => d.count);

            this.chartData = { labels, datasets: [{ label: "DAU", data: values }] }

            this.loaded = true;
        } catch (e) {
            console.error(e)
        }
    }
}
</script>

<style scoped>
.container {
    height: 95vh;
}
</style>