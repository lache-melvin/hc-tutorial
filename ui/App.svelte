<script>
  import { AppWebsocket } from '@holochain/conductor-api'
  import Buffer from 'buffer'

  // temp hack for the conductor api?
  window.Buffer = Buffer.Buffer

  let greeting = ''
  function handleClick () {
    getGreeting()
  }

  async function getGreeting () {
    const appConn = await AppWebsocket.connect('ws://localhost:8888')
    const appInfo = await appConn.appInfo({ installed_app_id: 'tut-app' })
    const cellId = appInfo.cell_data[0].cell_id

    const message = await appConn.callZome({
      cap: null,
      cell_id: cellId,
      zome_name: 'greeter',
      fn_name: 'hello',
      provenance: cellId[1],
      payload: null
    })
    greeting = message
  }

</script>
<div>
  <button on:click={handleClick}>Say hey</button>
  <p>Greeting: {greeting}</p>
</div>
