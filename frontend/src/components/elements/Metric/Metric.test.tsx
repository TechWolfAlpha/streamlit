/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import { Metric as MetricProto } from "src/autogen/proto"
import { mount } from "src/lib/test_util"
import { Theme } from "src/theme"
import { useTheme } from "emotion-theming"
import Metric, { MetricProps } from "./Metric"

const getProps = (elementProps: Partial<MetricProto> = {}): MetricProps => ({
  element: MetricProto.create({
    color: MetricProto.MetricColor.RED,
    direction: MetricProto.MetricDirection.UP,
    ...elementProps,
  }),
})

describe("Metric element", () => {
  it("renders metric as expected", () => {
    const props = getProps()
    const wrapper = mount(<Metric {...props} />)
    expect(wrapper).toBeDefined()
  })

  it("renders direction icon based on props", () => {
    const props = getProps()
    const wrapper = mount(<Metric {...props} />)
    expect(wrapper.find("StyledMetricDeltaText").find("svg")).toBeDefined()
  })

  it("renders direction icon based on props", () => {
    const props = getProps({
      color: MetricProto.MetricColor.GREEN,
      direction: MetricProto.MetricDirection.DOWN,
    })
    const wrapper = mount(<Metric {...props} />)
    let color = wrapper.find("StyledMetricDeltaText").prop("style").color
    expect(color).toBe("#09ab3b")
    expect(wrapper.find("StyledMetricDeltaText").find("svg")).toBeDefined()
  })

  it("renders no text and icon based on props", () => {
    const props = getProps({
      color: MetricProto.MetricColor.GRAY,
      direction: MetricProto.MetricDirection.NONE,
    })
    const wrapper = mount(<Metric {...props} />)
    expect(
      wrapper
        .find("StyledMetricDeltaText")
        .find("div")
        .at(1)
        .text()
    ).toBe("  ")
    expect(
      wrapper
        .find("StyledMetricDeltaText")
        .find("span")
        .text()
    ).toBe("")
  })

  it("renders correct gray based on props", () => {
    const props = getProps({
      color: MetricProto.MetricColor.GRAY,
      direction: MetricProto.MetricDirection.NONE,
    })
    const wrapper = mount(<Metric {...props} />)
    let color = wrapper.find("StyledMetricDeltaText").prop("style").color
    expect(color).toBe("#a3a8b8")
  })

  it("renders correct green based on props", () => {
    const props = getProps({
      color: MetricProto.MetricColor.GREEN,
      direction: MetricProto.MetricDirection.DOWN,
    })
    const wrapper = mount(<Metric {...props} />)
    let color = wrapper.find("StyledMetricDeltaText").prop("style").color
    expect(color).toBe("#09ab3b")
  })

  it("renders correct red based on props", () => {
    const props = getProps()
    const wrapper = mount(<Metric {...props} />)
    let color = wrapper.find("StyledMetricDeltaText").prop("style").color
    expect(color).toBe("#ff2b2b")
  })
})