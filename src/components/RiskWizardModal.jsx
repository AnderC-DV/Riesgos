import { X, ArrowRight, ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'

const probabilityLabels = {
  1: 'Muy baja',
  2: 'Baja',
  3: 'Media',
  4: 'Alta',
  5: 'Muy alta',
}

const impactLabels = {
  1: 'Insignificante',
  2: 'Menor',
  3: 'Moderado',
  4: 'Significativo',
  5: 'Crítico',
}

const defaultForm = () => ({
  processName: '',
  description: '',
  residualProbability: 3,
  residualImpact: 3,
  hasControls: false,
  controlsSummary: '',
})

export default function RiskWizardModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState(defaultForm)
  const [formError, setFormError] = useState('')

  const summary = useMemo(() => {
    return {
      ...formValues,
      probabilityLabel: probabilityLabels[formValues.residualProbability],
      impactLabel: impactLabels[formValues.residualImpact],
    }
  }, [formValues])

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (!formValues.processName?.trim() || !formValues.description?.trim()) {
      setFormError('Completa el nombre del proceso y la descripción antes de continuar.')
      return
    }
    setFormError('')
    setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    const payload = {
      process_name: formValues.processName,
      risk_description: formValues.description,
      residual_probability: formValues.residualProbability,
      residual_impact: formValues.residualImpact,
      inherent_probability: formValues.residualProbability,
      inherent_impact: formValues.residualImpact,
      controls: formValues.hasControls
        ? [{ summary: formValues.controlsSummary || 'Controles definidos en el wizard' }]
        : [],
      area_id: null,
    }

    try {
      await onSubmit(payload)
      setFormValues(defaultForm)
      setStep(1)
      setFormError('')
    } catch (error) {
      setFormError(error?.message || 'No se pudo guardar el riesgo. Intenta de nuevo.')
    }
  }

  const handleClose = () => {
    setFormValues(defaultForm)
    setStep(1)
    setFormError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 rounded-3xl p-px shadow-2xl">
        <div className="relative rounded-3xl bg-white/95 shadow-lg">
          <div className="flex items-center justify-between gap-4 rounded-t-3xl bg-gradient-to-br from-sky-500 to-cyan-600 px-6 py-5 text-white shadow-inner">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">Paso {step} de 2</p>
              <h2 className="text-2xl font-bold">Nuevo Riesgo</h2>
              <p className="text-sm text-white/80">configura, revisa y confirma antes de guardar</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
              aria-label="Cerrar modal de nuevo riesgo"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex items-center justify-between gap-2">
              {[1, 2].map((current) => (
                <div
                  key={current}
                  className={`flex-1 rounded-full border px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest transition ${
                    step === current
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {current === 1 ? 'Inicio' : 'Resumen'}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <fieldset className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nombre del proceso</label>
                  <input
                    value={formValues.processName}
                    onChange={(e) => handleChange('processName', e.target.value)}
                    placeholder="Escribe un título descriptivo"
                    className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    required
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Descripción del riesgo</label>
                  <textarea
                    value={formValues.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    placeholder="¿Qué puede ir mal?"
                    className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    required
                  />
                </fieldset>
                <div className="grid grid-cols-2 gap-4">
                  <fieldset className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Probabilidad residual</label>
                    <select
                      value={formValues.residualProbability}
                      onChange={(e) => handleChange('residualProbability', Number(e.target.value))}
                      className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    >
                      {Object.entries(probabilityLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {value} — {label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-400">1 = Muy baja · 5 = Muy alta</p>
                  </fieldset>
                  <fieldset className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Impacto residual</label>
                    <select
                      value={formValues.residualImpact}
                      onChange={(e) => handleChange('residualImpact', Number(e.target.value))}
                      className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    >
                      {Object.entries(impactLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {value} — {label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-400">1 = Insignificante · 5 = Crítico</p>
                  </fieldset>
                </div>
                {formError && (
                  <p className="text-sm text-rose-600">{formError}</p>
                )}
                <fieldset className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formValues.hasControls}
                      onChange={(e) => handleChange('hasControls', e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    ¿Ya existen controles?
                  </label>
                  {formValues.hasControls && (
                    <textarea
                      value={formValues.controlsSummary}
                      onChange={(e) => handleChange('controlsSummary', e.target.value)}
                      rows={2}
                      placeholder="Describe los controles conocidos"
                      className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    />
                  )}
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Resumen antes de enviar</p>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                  >
                    <ArrowLeft size={16} />
                    Editar
                  </button>
                </div>
                <div className="space-y-3 rounded-3xl border border-dashed border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Proceso</p>
                  <p className="text-xl font-bold text-slate-900">{summary.processName}</p>
                  <p className="text-sm text-slate-600">{summary.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs uppercase text-slate-400 tracking-[0.3em]">Probabilidad</p>
                      <p className="text-sm font-semibold text-slate-900">{summary.probabilityLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs uppercase text-slate-400 tracking-[0.3em]">Impacto</p>
                      <p className="text-sm font-semibold text-slate-900">{summary.impactLabel}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Área: pendiente de configuración</p>
                  <p className="text-xs text-slate-500">Con controles: {formValues.hasControls ? 'Sí' : 'No'}</p>
                  {formValues.hasControls && (
                    <p className="text-xs text-slate-500">Detalle: {formValues.controlsSummary || 'No se detallaron controles'}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => (step === 1 ? handleNext() : handleBack())}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 hover:border-slate-300"
              >
                {step === 1 ? (
                  <>
                    Siguiente
                    <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    Volver
                    <ArrowLeft size={16} />
                  </>
                )}
              </button>
              <button
                type="submit"
                disabled={step !== 2 || isSubmitting}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/30 transition hover:-translate-y-0.5 disabled:opacity-70"
              >
                {!!isSubmitting ? 'Guardando…' : 'Crear riesgo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
