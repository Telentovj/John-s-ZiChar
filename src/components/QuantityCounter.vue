<template>
  <div id="counter">
      <button v-on:click='decrease()' class="btn">-</button>
      <span class="counterNumber">{{counter}}</span>
      <button v-on:click='increase()' class="btn">+</button>
  </div>
</template>

<script>
export default {
    name:'QuantityCounter',
    data(){
        return{
            counter:0,
        }
    },
    props: {
        item: Object
    },
    methods:{
        decrease:function(){
            if(this.counter>0){ 
                this.counter--;
                this.$emit('counter', this.item, this.counter)
            }
        },
        increase:function(){
            if(this.counter==10){
                alert("You cannot buy more than 10 items.")
                this.$emit('counter', this.item, this.counter)
            }else{
                this.counter++;
                this.$emit('counter', this.item, this.counter)
            }
        }
    }   
}

</script>

<style>
.btn{
    padding: 10px;
    margin: 20px;
    background-color:#d9f79d;
    border-radius: 5px;
} 

.counterNumber{
    font-size: 10px;
}
</style>