<template>
    <button @click="increment()">
        You clicked me {{ count }} times.
    </button>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() { 
            this.count++;
        }
    }
}
</script>