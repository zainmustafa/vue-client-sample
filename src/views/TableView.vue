<template>
    <div class="container">
        <v-table v-if="loaded">
            <thead>
                <tr>
                    <th v-for="item in headers" :key="item.key" class="header">
                        {{ item.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.count" class="body">
                    <td>{{ item.date }}</td>
                    <td>{{ item.country }}</td>
                    <td>{{ item.count }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
  
<script>
// Uncomment this
// import axios from 'axios';

export default {
    name: 'TableView',
    data() {
        return {
            loaded: false,
            data: null,
            headers: [
                { title: 'Month', key: 'date' },
                { title: 'Country', key: 'country' },
                { title: 'DAU', key: 'count' }
            ],
        };
    },
    async mounted() {
        try {
            this.loaded = false;

            // API Response is an invalid JSON, it has a missing comma after third oject which is resulting in exception when parsed
            // **** Once Response from Backend is sorted, uncomment below two lines **** //
            // const response = await axios.get('https://9e34429a-eba3-4e56-85f2-685706a08897.mock.pstmn.io/report/dau?dashboardUserId=abc123&periodFrom=1669852800&periodTo=1674063742&aggregateBy%5B0%5D=month&aggregateBy%5B1%5D=country');
            // const parsed = await JSON.parse(response);

            // and remove this block
            const response = `{
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

            const parsed = await JSON.parse(response);
            this.data = parsed.items;

            this.loaded = true;
        } catch (e) {
            console.error(e)
        }
    }
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 80vh;
}

.header {
    width: 200px;
    border: 1px solid #000;
}

.body td {
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
}
</style>