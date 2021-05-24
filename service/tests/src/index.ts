import path from 'path'
import { Orchestrator, Config, InstallAgentsHapps } from '@holochain/tryorama'

// generate config for the conductor
const conductorConfig = Config.gen()

const dnaPath = path.join(__dirname, '../../workdir/dna/greeter.dna')

// array of agents
const installation: InstallAgentsHapps = [
  // agent's array of happs
  [ 
    // happ's array of dna paths
    [dnaPath]
  ]
]

const orchestrator = new Orchestrator()

orchestrator.registerScenario('holo says hello', async (s, t) => {
  const [stevie] = await s.players([conductorConfig])

  // result of installAgentsHapps is an array of agents. we destructure stevie
  // from that, and then destructure stevie's first happ from there
  // (calling it stevie_common)
  const [[stevie_common]] = await stevie.installAgentsHapps(installation)

  // taking the first cell of the stevie_common happ, and calling the hello
  // function from the greeter zome (payload is null)
  let result = await stevie_common.cells[0].call('greeter', 'hello', null)

  t.equal(result, 'Hello Holo Dev')
})

orchestrator.run()
