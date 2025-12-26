import { useAppKitAccount } from '@reown/appkit/react'
import { openContractCall } from '@stacks/connect'
import { uintCV, principalCV } from '@stacks/transactions'
import { StacksMainnet } from '@stacks/network'

export default function GrantCreator() {
  const { address, isConnected } = useAppKitAccount()

  const createNewGrant = async () => {
    // Example: Sending 100 STX to a recipient with 144 block lock (approx 24h)
    await openContractCall({
      contractAddress: 'SP123...YOUR_DEPLOYED_ADDR',
      contractName: 'impact-grants',
      functionName: 'create-grant',
      functionArgs: [
        principalCV('SP3FG...RECIPIENT_ADDR'), // Recipient
        uintCV(100000000),                      // 100 STX (8 decimals)
        uintCV(144)                             // Duration in blocks
      ],
      network: new StacksMainnet(),
      onFinish: (res) => console.log("Grant Created!", res.txId),
    })
  }

  return (
    <section className="grant-card">
      <h2>🚀 Create an Impact Grant</h2>
      {!isConnected ? (
        <appkit-button /> 
      ) : (
        <div className="form-group">
          <p>Connected as: <code>{address}</code></p>
          <button onClick={createNewGrant} className="primary-btn">
            Deposit & Lock Funds
          </button>
        </div>
      )}
    </section>
  )
}
