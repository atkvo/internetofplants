<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.data,
      {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              autoSkipPadding: 20
            }
          }]
        }
      })
  }
})
</script>
