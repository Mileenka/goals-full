import Goal from "../models/goalModel.js";

const goalControllers = {
    // @desc    Get goals
    // @route   GET /api/goals
    // @access  Private
    getGoals: async (req, res) => {
        try {
            const result = await Goal.find();
            if (result.length > 0) {
                res.status(200).json({ success: true, goals: result });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No Goals found'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message
            });
        }
    },
    // @desc    Set goal
    // @route   POST /api/goals
    // @access  Private
    setGoal: async (req, res) => {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({
                    success: false,
                    err: 'Please add the required data'
                });
            }

            const result = await Goal.create({ text });
            return res.status(201).json({
                success: true,
                goal: result
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Error while adding the goal'
            });
        }
    },

    // @desc    Update goal
    // @route   PUT /api/goals/:id
    // @access  Private
    updateGoal: async (req, res) => {
        try {
            const { id } = req.params;
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({
                    success: false,
                    err: 'Please add the required data'
                });
            }

            const result = await Goal.updateOne(
                { _id: id },
                { text }
            );

            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Goal updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Goal not found for update'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Error while updating the goal'
            });
        }
    },

    // @desc    Delete goal
    // @route   DELETE /api/goals/:id
    // @access  Private
    deleteGoal: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Goal.deleteOne({ _id: id });

            if (result.deletedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Goal deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Goal not found for delete'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Failed to delete a goal'
            });
        }
    }
}

export default goalControllers;