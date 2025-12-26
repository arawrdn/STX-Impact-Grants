import { createAppKit } from '@reown/appkit/react'
import { StacksAdapter } from '@reown/appkit-adapter-stacks'
import { stacks, stacksTestnet } from '@reown/appkit/networks'

export const projectId = '180a7164cfa9e5388daf1160841f65a0'

export const appKit = createAppKit({
  adapters: [new StacksAdapter()],
  networks: [stacks, stacksTestnet],
  projectId,
  metadata: {
    name: 'Impact Grants',
    description: 'Transparent Crowdfunding on Bitcoin L2',
    url: 'https://impact.stx',
    icons: ['https://stacks.org/logo.png']
  },
  features: {
    email: true, // Crucial for mass adoption in crowdfunding
    socials: ['x', 'google', 'github'],
    analytics: true,
    swaps: false // Focus only on grants
  }
})
