import React, { PropsWithChildren, useRef } from 'react';
import RoundWarningSvg from 'shared/svg/round-warning/RoundWarningSvg';
import classes from './invalidCellWrapper.module.scss';
import CustomTooltip from 'shared/components/custom-tooltip/CustomTooltip';

type TemplateInvalidCellWrapperProps = {
	isValid: boolean
} & PropsWithChildren
const TemplateInvalidCellWrapper = ({ children, isValid }: TemplateInvalidCellWrapperProps): JSX.Element => {

	const svgRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className={classes['invalid-wrapper']}>
			{children}

			{!isValid &&
                <div
                    className={classes['invalid-wrapper__svg-container']}
                >
                    <CustomTooltip
                        tooltipText={'Шаблон некорректен'}
                        anchorRefCurrent={svgRef.current}
                        placement={'top-end'}
                    >
                        <div
                            ref={svgRef}
                            className={classes['invalid-wrapper__svg-container__svg']}
                        >
                            <RoundWarningSvg/>
                        </div>
                    </CustomTooltip>

                </div>
			}
		</div>
	);
};

export default TemplateInvalidCellWrapper;