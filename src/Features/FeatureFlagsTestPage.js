import React, { useEffect } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import NewUser from "./NewUser";
import User from "./User";
import TrafficExample from "./TrafficExample";
import {FeatureFlag, On, Off} from "../Components/FeatureToggle";


const  FeatureFlagsTestPage = () => {

    const isNewUser = useFlag('new_user_flow');
    const trafficControl = useFlag("experiment_flag");

    const userToggle = () => {
        if(isNewUser){
            return <NewUser />
        } else{
            return  <User />
        }
    }

    return (
        <div className={'flex_container'}>
            <div className='section-title'>
            Feature flag Option 1 - using "if statement" in the code
            </div>
            <div className="feature-flag-option1">
                {userToggle()}
                {
                    trafficControl ? <TrafficExample/> : <></>
                }
            </div>
            <div className='section-title'>
            Feature flag Option 2 - using "Compound components"
            </div>
            <div className="feature-flag-option2">
                <FeatureFlag flagName="new_user_flow">
                    <On>
                        <NewUser />
                    </On>
                    <Off>
                       <User />
                    </Off>
                </FeatureFlag>
                <FeatureFlag flagName="experiment_flag">
                    <On>
                        <TrafficExample />
                    </On>
                    <Off>
                        <></>
                    </Off>
                </FeatureFlag>
            </div>
        </div>

    )
}

export default FeatureFlagsTestPage;