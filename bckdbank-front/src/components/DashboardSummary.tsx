import { ArrowLeftRight, ArrowRight, ArrowUpRight, Eye, RefreshCw, Wallet } from 'lucide-react'
import { useState } from 'react'
import { formatMoney } from '../lib/formatters'

interface DashboardSummaryProps {
  accountCount: number
  totalBalance: number
  transactionCount: number
  loading: boolean
  onRefresh: () => void
  onOpenTransfer: () => void
}

export default function DashboardSummary({
  accountCount,
  totalBalance,
  transactionCount,
  loading,
  onRefresh,
  onOpenTransfer,
}: DashboardSummaryProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  return (
    <section className="summary-grid" aria-label="Resumen financiero">
      <article className="balance-panel">
        <div className="balance-panel-top">
          <span>Saldo total disponible · USD</span>
          <div className="balance-actions">
            <button
              type="button"
              onClick={() => setBalanceVisible((visible) => !visible)}
              aria-label={balanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
              title={balanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
            >
              <Eye size={15} />
            </button>
          <span className="balance-chip">
            <Wallet size={14} />{accountCount} {accountCount === 1 ? 'cuenta' : 'cuentas'}
          </span>
          </div>
        </div>
        <div className="balance-value">
          {loading ? <span className="balance-skeleton" /> : balanceVisible ? formatMoney(totalBalance) : '••••••••'}
        </div>
        <div className="balance-panel-bottom">
          <span>Consolidado de tus cuentas</span>
          <button onClick={onRefresh} aria-label="Actualizar saldos" title="Actualizar saldos">
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="balance-decoration balance-decoration-one" />
        <div className="balance-decoration balance-decoration-two" />
      </article>
      <article className="metric-panel">
        <div className="metric-icon metric-icon-mint"><ArrowLeftRight size={18} /></div>
        <span className="metric-label">Movimientos registrados</span>
        <strong className="metric-value">{loading ? '—' : transactionCount}</strong>
        <span className="metric-footnote">En tus cuentas</span>
      </article>
      <button className="transfer-cta" onClick={onOpenTransfer} disabled={accountCount === 0}>
        <span className="cta-icon"><ArrowUpRight size={20} /></span>
        <span><strong>Transferir dinero</strong><small>Envía a otra cuenta Lexa</small></span>
        <ArrowRight className="cta-arrow" size={18} />
      </button>
    </section>
  )
}
