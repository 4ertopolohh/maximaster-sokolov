import { useState, type ChangeEvent } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../PlacingAnOrder/PlacingAnOrder.scss'
import PlacingAnOrderInputComment from '../PlacingAnOrderInputComment/PlacingAnOrderInputComment'
import PlacingAnOrderInputEmail from '../PlacingAnOrderInputEmail/PlacingAnOrderInputEmail'
import PlacingAnOrderInputName from '../PlacingAnOrderInputName/PlacingAnOrderInputName'
import PlacingAnOrderInputPhone from '../PlacingAnOrderInputPhone/PlacingAnOrderInputPhone'
import PlacingAnOrderSendButton from '../PlacingAnOrderSendButton/PlacingAnOrderSendButton'
import PlacingAnOrderWarring, { type PlacingAnOrderWarringStatus } from '../PlacingAnOrderWarring/PlacingAnOrderWarring'
import PlacingAnOrderYandexMap from '../PlacingAnOrderYandexMap/PlacingAnOrderYandexMap'

type Coordinates = [number, number]

type FieldKey = 'name' | 'phone' | 'email' | 'map'

type FieldErrors = Record<FieldKey, boolean>

const initialErrors: FieldErrors = {
    name: false,
    phone: false,
    email: false,
    map: false,
}

const normalizePhone = (value: string) => value.replace(/\D/g, '').slice(0, 11)

const isValidName = (value: string) => value.trim().length > 0

const isValidPhone = (value: string) => value.length === 11

const isValidEmail = (value: string) => {
    if (value.length === 0) return false
    if (/\s/.test(value)) return false
    if (!/^[A-Za-z0-9._%+\-@]+$/.test(value)) return false

    const parts = value.split('@')
    if (parts.length !== 2) return false

    const [local, domain] = parts
    if (!local || !domain) return false
    if (!/^[A-Za-z0-9._%+\-]+$/.test(local)) return false
    if (!/^[A-Za-z0-9.-]+$/.test(domain)) return false

    return true
}

const firstErrorMessage = (errors: FieldErrors) => {
    if (errors.name) return 'Не верно указано ФИО'
    if (errors.phone) return 'Не верно указан номер телефона'
    if (errors.email) return 'Не верно указан email'
    if (errors.map) return 'Не отмечен адрес доставки'
    return ''
}

const PlacingAnOrder = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [deliveryCoords, setDeliveryCoords] = useState<Coordinates | null>(null)

    const [errors, setErrors] = useState<FieldErrors>(initialErrors)
    const [warningText, setWarningText] = useState<string>('')
    const [warningStatus, setWarningStatus] = useState<PlacingAnOrderWarringStatus>('error')

    const clearSuccessOnEdit = () => {
        if (warningStatus === 'success') {
            setWarningText('')
            setWarningStatus('error')
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearSuccessOnEdit()

        const nextValue = e.target.value
        setName(nextValue)

        if (errors.name && isValidName(nextValue)) {
            setErrors((prev) => ({ ...prev, name: false }))
            setWarningText((prev) => (prev === 'Не верно указано ФИО' ? '' : prev))
        }
    }

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearSuccessOnEdit()

        const nextValue = normalizePhone(e.target.value)
        setPhone(nextValue)

        if (errors.phone && isValidPhone(nextValue)) {
            setErrors((prev) => ({ ...prev, phone: false }))
            setWarningText((prev) => (prev === 'Не верно указан номер телефона' ? '' : prev))
        }
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearSuccessOnEdit()

        const raw = e.target.value
        const nextValue = raw.replace(/\s/g, '').replace(/[^A-Za-z0-9._%+\-@]/g, '')
        setEmail(nextValue)

        if (errors.email && isValidEmail(nextValue)) {
            setErrors((prev) => ({ ...prev, email: false }))
            setWarningText((prev) => (prev === 'Не верно указан email' ? '' : prev))
        }
    }

    const handleMapChange = (coords: Coordinates) => {
        clearSuccessOnEdit()

        setDeliveryCoords(coords)

        if (errors.map) {
            setErrors((prev) => ({ ...prev, map: false }))
            setWarningText((prev) => (prev === 'Не отмечен адрес доставки' ? '' : prev))
        }
    }

    const handleSubmit = () => {
        const nextErrors: FieldErrors = {
            name: !isValidName(name),
            phone: !isValidPhone(phone),
            email: !isValidEmail(email),
            map: deliveryCoords === null,
        }

        const hasAnyError = Object.values(nextErrors).some(Boolean)

        setErrors(nextErrors)

        if (hasAnyError) {
            setWarningStatus('error')
            setWarningText(firstErrorMessage(nextErrors))
            return
        }

        setWarningStatus('success')
        setWarningText('Успешно!')
    }

    return (
        <section className="placingAnOrder">
            <div className="container">
                <SectionTitle title="Оформление заказа" />
                <form className="taskWrapper">
                    <PlacingAnOrderInputName value={name} onChange={handleNameChange} hasError={errors.name} />
                    <PlacingAnOrderInputPhone value={phone} onChange={handlePhoneChange} hasError={errors.phone} />
                    <PlacingAnOrderInputEmail value={email} onChange={handleEmailChange} hasError={errors.email} />
                    <PlacingAnOrderYandexMap value={deliveryCoords} onChange={handleMapChange} hasError={errors.map} />
                    <PlacingAnOrderInputComment />
                    <PlacingAnOrderSendButton onClick={handleSubmit} />
                    <PlacingAnOrderWarring text={warningText} status={warningStatus} />
                </form>
            </div>
        </section>
    )
}

export default PlacingAnOrder
