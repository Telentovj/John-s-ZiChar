import { Bar } from 'vue-chartjs'


export default {
  extends: Bar,
  props:['dishesOrdered'],
  data: function () {
    return {
        datacollection: {
            labels: ["Sambal KangKung", "Cereal Prawn", "Prawn Omelette", "Pork Fried Rice", "Mapo Tofu","Dry Beef Hor Fun"],
            datasets: [{
                label: "Dishes Ordered",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#8e5ea2"],
                data: this.dishesOrdered,
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Cumulative Dishes ordered from John"s Tze Char'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options,this.dishesOrdered);
  }
}
