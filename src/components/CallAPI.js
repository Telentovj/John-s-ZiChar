import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
              { 
                label: "Central",
                data: [],
                fill: false,
                borderColor: '#2196f3',
              }, 
              { 
                label: "East",
                data: [],
                fill: false,
                borderColor: '#0392cf',
              }, 
              { 
                label: "National",
                data: [],
                fill: false,
                borderColor: '#7bc043',
              }, 
              { 
                label: "North",
                data: [],
                fill: false,
                borderColor: '#fdf498',
              }, 
              { 
                label: "South",
                data: [],
                fill: false,
                borderColor: '#f37736',
              }, 
              { 
                label: "West",
                data: [],
                fill: false,
                borderColor: '#ee4035',
              }, 
          ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          //console.log(this.datacollection.datasets[0].data);
          for(var i = 0; i < 23; i++){
            //console.log(response.data.items[i].readings.psi_twenty_four_hourly);
            //console.log(response.data.items[i].timestamp);
            this.datacollection.labels.push(response.data.items[i].timestamp);
            var buffer2 = response.data.items[i].readings.psi_twenty_four_hourly;
            this.datacollection.datasets[0].data.push(buffer2.central);
            this.datacollection.datasets[1].data.push(buffer2.east);
            this.datacollection.datasets[2].data.push(buffer2.national);
            this.datacollection.datasets[3].data.push(buffer2.north);
            this.datacollection.datasets[4].data.push(buffer2.south);
            this.datacollection.datasets[5].data.push(buffer2.west);
          }
          console.log(this.datacollection.labels);
          console.log(this.datacollection.datasets);
          console.log(this.datacollection.datasets[0]);
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}