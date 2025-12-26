;; Title: Impact Grants Escrow
;; Logic: Funds are locked until a specific block height or manual milestone approval.

;; Constants
(define-constant ERR-NOT-AUTHORIZED (err u401))
(define-constant ERR-GRANT-EXPIRED (err u402))
(define-constant ERR-ALREADY-RELEASED (err u403))

;; Data Maps
(define-map Grants uint 
    {
        creator: principal,
        recipient: principal,
        amount: uint,
        target-block: uint,
        released: bool
    }
)

;; Data Var
(define-data-var grant-nonce uint u0)

;; Public: Create a Grant
(define-public (create-grant (recipient principal) (amount uint) (duration uint))
    (let ((id (var-get grant-nonce)))
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (map-set Grants id {
            creator: tx-sender,
            recipient: recipient,
            amount: amount,
            target-block: (+ block-height duration),
            released: false
        })
        (ok (var-set grant-nonce (+ id u1)))
    )
)

;; Public: Release Funds (Only after target block)
(define-public (release-grant (id uint))
    (let ((grant (unwrap! (map-get? Grants id) ERR-NOT-AUTHORIZED)))
        (asserts! (not (get released grant)) ERR-ALREADY-RELEASED)
        (asserts! (>= block-height (get target-block grant)) ERR-GRANT-EXPIRED)
        
        (try! (as-contract (stx-transfer? (get amount grant) (as-contract tx-sender) (get recipient grant))))
        (ok (map-set Grants id (merge grant { released: true })))
    )
)
