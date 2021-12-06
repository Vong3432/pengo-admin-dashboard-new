import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export class User {
    @JsonProperty() id: number;
    @JsonProperty() username: string;
    @JsonProperty() avatar: string;
    @JsonProperty() email: string;
    @JsonProperty() phone: string;
    @JsonProperty() age: number;
    @JsonProperty('role.name') role: any;

    @JsonProperty('is_banned')
    isBanned: boolean;

    @JsonProperty('created_at')
    createdAt: string;
    @JsonProperty('updated_at')
    updatedAt: string;
}