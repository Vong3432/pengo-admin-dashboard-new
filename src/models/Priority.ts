import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export class Priority {
    @JsonProperty() id: number
    @JsonProperty('table_name') tableName: string
    @JsonProperty('is_active') isActive: boolean
}