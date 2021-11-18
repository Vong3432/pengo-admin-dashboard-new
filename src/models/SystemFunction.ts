import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export class SystemFunction {
    @JsonProperty() id: number
    @JsonProperty() name: string
    @JsonProperty() description: string
    @JsonProperty('is_premium') isPremium: boolean
    @JsonProperty('is_active') isActive: boolean
    @JsonProperty() price: number
}