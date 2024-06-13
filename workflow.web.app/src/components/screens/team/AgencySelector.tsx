import {Form} from "react-bootstrap";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/hooks.ts";
import {useGetAgencyByUserQuery} from "../../../store/apis/agency/agencyApi.ts";
import './style.scss'
import SkeletonInput from "antd/es/skeleton/Input";
import {selectProject} from "../../../store/slices/projectSlice.ts";
import {selectAgency} from "../../../store/slices/agencySlice.ts";
import {useEffect} from "react";

const AgencySelector = () => {
    const dispatch = useAppDispatch();

    const {user} = useTypedSelector(state => state.user)
    const {selectedAgencyId} = useTypedSelector((state) => state.agency);

    const {data: agencies, isLoading, refetch} =
        useGetAgencyByUserQuery(user?.userId ?? 0, {
            skip: user === null
        });

    const handleChange = async (id: number) => {
        await dispatch(selectProject(undefined))
        await dispatch(selectAgency(id))
    }

    useEffect(() => {
        const selectFirstAgency = async () => {
            const isNotSelected = !selectedAgencyId && agencies && agencies.length > 0
            const isDeletedSelected = agencies && !agencies.map(a => a.agencyId).includes(selectedAgencyId ?? -1)

            if (isNotSelected || isDeletedSelected) {
                await dispatch(selectAgency(agencies[0]?.agencyId));
            }
        }

        refetch()

        selectFirstAgency()
    }, [agencies, dispatch, selectedAgencyId]);

    return (
        <>
            {
                isLoading ? (
                    <SkeletonInput active/>
                ) : (
                    <Form.Select
                        value={selectedAgencyId || ''}
                        onChange={(event) => handleChange(parseInt(event.target.value))}
                    >
                        {agencies?.map((agency) => (
                            <option key={agency.agencyId} value={agency.agencyId}>
                                {agency.name}
                            </option>
                        ))}
                    </Form.Select>
                )}
        </>
    );
};

export default AgencySelector;