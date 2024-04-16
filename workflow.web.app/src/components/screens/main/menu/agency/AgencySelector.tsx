import {FC, useEffect} from 'react';
import {Form} from "react-bootstrap";
import {useAppDispatch, useTypedSelector} from "../../../../../store/hooks/hooks.ts";
import {useGetAgencyByUserQuery} from "../../../../../store/apis/agencyApi.ts";
import {selectAgency} from "../../../../../store/slices/agencySlice.ts";
import {selectProject} from "../../../../../store/slices/projectSlice.ts";

const AgencySelector: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useTypedSelector((state) => state.user);
    const {data: agencies} = useGetAgencyByUserQuery(user!.userId, {skip: user === null});

    const selectedAgencyIdRedux = useTypedSelector((state) => state.agency?.selectedAgencyId);

    const handleAgencyChange = async (agencyId: number) => {
        await dispatch(selectAgency(agencyId));
        await dispatch(selectProject(null))
    };

    useEffect(() => {
        if (selectedAgencyIdRedux === null && agencies && agencies.length > 0) {
            dispatch(selectAgency(agencies[0]?.agencyId));
        }
    }, [dispatch, selectedAgencyIdRedux, agencies]);

    return (
        <Form.Select value={selectedAgencyIdRedux || ''}
                     onChange={(e) =>
                         handleAgencyChange(parseInt(e.target.value))}>
            {agencies?.map((agency) => (
                <option key={agency.agencyId} value={agency.agencyId}>
                    {agency.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default AgencySelector;