<script lang='typescript'>

export let state = "paused"
export let elapsed = 0

$: resetTimer(state)

let startedAt

const resetTimer = (x) => {
  console.log("reset:", {state})

  if (state == "start") {
    start()
  } else if (state == "paused") {
    pause()
  } else {
    stop()
  }
}

const start = () => {
  console.log("starting a timer")
}

const pause = () => {
  console.log("pausing the timer")
}

const stop = () => {
  console.log("stopping the timer")
}

</script>

<div> {state} </div>
