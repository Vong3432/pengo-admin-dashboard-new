import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export class Setting {
    @JsonProperty() id: number
    @JsonProperty() name: string
    @JsonProperty('key') settingKey: string
    @JsonProperty() value: any
    @JsonProperty('is_active')
    isActive: boolean;
}