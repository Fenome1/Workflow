import {Button, Form, message, Typography} from "antd";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import {FC, useEffect} from "react";
import {useGetLinkByAgencyQuery, useRefreshLinkMutation} from "../../../../../../../../../store/apis/link/linkApi.ts";
import SkeletonInput from "antd/es/skeleton/Input";
import "./style.scss"

interface AgencyCreateLinkForm {
    agency?: IAgency
}

const AgencyCreateLinkForm: FC<AgencyCreateLinkForm> = ({agency}) => {
    const [form] = Form.useForm();
    const {data: agencyLink, isLoading} = useGetLinkByAgencyQuery(
        agency?.agencyId ?? -1,
        {skip: agency === undefined}
    );
    const [refreshLink] = useRefreshLinkMutation();

    useEffect(() => {

        const refreshIfEmpty = async () => {
            if (agency && !agencyLink && !isLoading) {
                await refreshLink(agency.agencyId);
            }
        };

        refreshIfEmpty();
    }, [isLoading]);

    const handleRefresh = async () => {
        if (!agency) return;
        await refreshLink(agency.agencyId);
    }

    const handleCopy = () => {
        if (agencyLink) {
            navigator.clipboard
                .writeText(agencyLink.value)
                .then(() => {
                    message.success("Ссылка скопирована");
                })
                .catch(() => {
                    message.error("Ошибка при копировании ссылки");
                });
        }
    };

    const calculateExpiryDate = (expiryDateString: string) => {
        const expiryDate = new Date(expiryDateString);
        return expiryDate.toLocaleDateString();
    };

    return (
        <Form
            className='create-link-form'
            form={form}
            name="createLinkForm"
            layout="horizontal">
            <Form.Item
                name="generatedLink"
                className='generated-link-container'>
                <div className='generated-link-content'>
                    <div className='generated-link-text'>
                        {isLoading ? <SkeletonInput active/> :
                            <>
                                <Typography className='agency-link'
                                            rel="noopener noreferrer"
                                            onClick={handleCopy}>{agencyLink?.value}</Typography>
                                <div className='agency-link-description'>
                                    {agencyLink?.expirationDate &&
                                        <Typography.Text type="secondary">
                                            Действительна до: {calculateExpiryDate(agencyLink.expirationDate)}
                                        </Typography.Text>}
                                    {agencyLink && agencyLink?.usedCount > 0 &&
                                        <Typography.Text type="secondary">
                                            Использовано: {agencyLink.usedCount}
                                        </Typography.Text>}
                                </div>
                            </>
                        }
                    </div>
                    <Button onClick={handleCopy} className='generated-link-button-copy'>Скопировать
                    </Button>
                </div>
            </Form.Item>
            <Form.Item>
                <Button className='regenerate-link-button' type='primary'
                        onClick={handleRefresh}>Сгенерировать новую</Button>
            </Form.Item>
        </Form>
    );
};

export default AgencyCreateLinkForm;