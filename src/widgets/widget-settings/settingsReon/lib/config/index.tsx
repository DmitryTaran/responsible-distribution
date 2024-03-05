export enum SettingsOptionsId {
    user =  'reon_main_settings',
    payment = 'reon_payment',
}

export const SettingsConfig = [
    {
        id: SettingsOptionsId.user,
        title: "Настройки"
    },
    {
        id: SettingsOptionsId.payment,
        title: "Подписка"
    },
] as const;
