import {Button, Form, message, Typography} from "antd";
import {IAgency} from "../../../../../../../../../features/models/IAgency.ts";
import {FC, useEffect} from "react";
import {useGetLinkByAgencyQuery, useRefreshLinkMutation} from "../../../../../../../../../store/apis/link/linkApi.ts";
import SkeletonInput from "antd/es/skeleton/Input";
import "./style.scss"
import {BiRefresh} from "react-icons/bi";
import CopyToClipboard from "react-copy-to-clipboard";

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

    const calculateExpiryDate = (expiryDateString: string) => {
        const expiryDate = new Date(expiryDateString);
        return expiryDate.toLocaleDateString();
    };

    const isLinkExpired = agencyLink?.expirationDate && new Date(agencyLink.expirationDate) < new Date();

    const onCopyComplete = () => {
        message.success("Сылка скопирована в буфер обмена")
    }

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
                                <CopyToClipboard text={agencyLink?.value ?? ""}
                                                 onCopy={onCopyComplete}>
                                    <Typography className='agency-link'>{agencyLink?.value}</Typography>
                                </CopyToClipboard>
                                <div className='agency-link-description'>
                                    {agencyLink?.expirationDate &&
                                        <div className='agency-work-link-date'>
                                            <div className='agency-link-date-text'>
                                                {!isLinkExpired ?
                                                    <Typography.Text type="secondary">
                                                        Действительна
                                                        до: {calculateExpiryDate(agencyLink.expirationDate)}
                                                    </Typography.Text> :
                                                    <Typography.Text type="danger">Не действительна</Typography.Text>}
                                            </div>
                                            {isLinkExpired &&
                                                <Button danger type='link' icon={<BiRefresh/>}
                                                        onClick={handleRefresh}
                                                        className='agency-link-date-button'>Заменить</Button>}
                                        </div>
                                    }
                                    {agencyLink && agencyLink?.usedCount > 0 &&
                                        <Typography.Text type="secondary">
                                            Использовано: {agencyLink.usedCount}
                                        </Typography.Text>}
                                </div>
                            </>
                        }
                    </div>
                    <CopyToClipboard text={agencyLink?.value ?? ""}
                                     onCopy={onCopyComplete}>
                        <Button className='generated-link-button-copy'>Скопировать
                        </Button>
                    </CopyToClipboard>
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